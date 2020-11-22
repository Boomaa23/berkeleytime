import React, { useState } from 'react';
import { GroupedOptionsType, ValueType } from 'react-select';
import BTSelect from 'components/Custom/Select';
import FilterModal from './FilterModal';

import {
  FilterParameter,
  Filters,
  getChanges,
  getOverlappingValues,
  PlaylistDescription,
} from '../../utils/playlists/playlist';
import {
  filterTypeIsClearable,
  filterTypeIsMulti,
  filterTypeIsSearchable,
  filterTypeToPlaceholder,
  filterTypeToString,
} from '../../utils/playlists/filterTypes';
import { CourseSortAttribute } from 'utils/courses/sorting';

type Props = {
  filters: Filters;
  activeFilters: string[];
  modifyFilters: (add: Set<string>, remove: Set<string>) => void;

  search?: string;
  setSearch: (query: string) => void;

  sort?: string;
  setSort: (sort: CourseSortAttribute) => void;

  isMobile?: boolean;
};

type SortOption = { value: CourseSortAttribute; label: string };
const SORT_OPTIONS: SortOption[] = [
  { value: 'relevance', label: 'Sort By: Relevance' },
  { value: 'average_grade', label: 'Sort By: Average Grade' },
  { value: 'department_name', label: 'Sort By: Department Name' },
  { value: 'open_seats', label: 'Sort By: Open Seats' },
  { value: 'enrolled_percentage', label: 'Sort By: Percent Enrolled' },
];

const DEFAULT_SORT = SORT_OPTIONS[0];

const FilterSidebar = ({
  filters,
  activeFilters,
  modifyFilters,
  search = '',
  setSearch,
  sort = DEFAULT_SORT.value,
  setSort,
  isMobile = false,
}: Props) => {

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [modal, setModal] = useState({
    options: [] as PlaylistDescription,
    default: null as FilterParameter[] | null,
    handler: (_filters: FilterParameter[]) => {},
    isMulti: true
  });

  function resetFilters() {
    setSearch('');
    setSort(DEFAULT_SORT.value);
    modifyFilters(new Set(), new Set(activeFilters));
  }

  /**
   * Takes a subset of filters and then updates according to
   * the definitive list of new filters from value.
   */
  const filterHandler = (allOptions: PlaylistDescription) => (
    value?: ValueType<FilterParameter>
  ) => {
    const [add, remove] = getChanges(
      ([] as FilterParameter[]).concat(value || []),
      allOptions
    );
    modifyFilters(add, remove);
  };

  //show the mobile modals
  function showModal({
    options,
    selected,
    handler,
    isMulti = true,
  }: {
    options: PlaylistDescription;
    selected: FilterParameter[];
    handler: (filters: FilterParameter[]) => void;
    isMulti?: boolean;
  }) {
    setModal({
      options: options,
      default: selected,
      handler: handler,
      isMulti: isMulti,
    });
    setShowFilterModal(true);
  }

  function hideModal() {
    setModal({
      options: [],
      default: null,
      handler: () => {},
      isMulti: false
    });
    setShowFilterModal(false);
  }

  return !isMobile ? (
    <div id="filter" className="filter">
      <div className="filter-name">
        <p>Filters</p>
        <button type="button" onClick={resetFilters}>
          Reset
        </button>
      </div>
      <div className="filter-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder=" &#xf002;  Search for a class..."
        />
      </div>
      <div className="filter-sort">
        <BTSelect
          options={SORT_OPTIONS}
          isSearchable={false}
          onChange={(e) => setSort((e as SortOption).value)}
          value={SORT_OPTIONS.find((o) => o.value === sort)}
        />
      </div>
      {filters.map((option) => (
        <div className="filter-option" key={option.type}>
          <p>{filterTypeToString(option.type)}</p>
          <BTSelect
            isClearable={filterTypeIsClearable(option.type)}
            isMulti={filterTypeIsMulti(option.type)}
            closeMenuOnSelect={!filterTypeIsMulti(option.type)}
            isSearchable={filterTypeIsSearchable(option.type)}
            options={option.options as GroupedOptionsType<FilterParameter>}
            onChange={filterHandler(option.options)}
            value={getOverlappingValues(activeFilters, option.options)}
            placeholder={filterTypeToPlaceholder(option.type)}
          />
        </div>
      ))}
      <div id="filter-end"></div>
    </div>
  ) : (
    <div id="filter" className="filter">
      <div className="filter-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder=" &#xf002;  Search for a class..."
        />
      </div>

      <div className="filter-scroll">
        <button
          className="btn-bt-border filter-scroll-btn blue-text"
          onClick={resetFilters}
        >
          Reset{' '}
        </button>
        <button
          className="btn-bt-border filter-scroll-btn"
          onClick={() =>
            showModal({
              selected: SORT_OPTIONS.filter((o) => o.value === sort),
              options: SORT_OPTIONS,
              handler: (p) => setSort((p[0] as SortOption).value),
              isMulti: false,
            })
          }
        >
          Sort&nbsp;By{' '}
        </button>
        {filters.map((option) => (
          <button
            key={option.type}
            className="btn-bt-border filter-scroll-btn"
            onClick={() =>
              showModal({
                selected: getOverlappingValues(activeFilters, option.options),
                options: option.options,
                handler: filterHandler(option.options),
                isMulti: filterTypeIsMulti(option.type),
              })
            }
          >
            {`${filterTypeToString(option.type)} `}
          </button>
        ))}
      </div>
      <FilterModal
        options={modal.options}
        defaultSelection={modal.default}
        showFilters={showFilterModal}
        hideModal={hideModal}
        storeSelection={modal.handler}
        displayRadio={!modal.isMulti}
      />
    </div>
  );
};

export default FilterSidebar;
