import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useLocation, useHistory } from 'react-router-dom'

import { ReduxState } from '../../redux/store'
import { closeBanner } from '../../redux/common/actions'

import close from '../../assets/svg/common/close.svg'

interface Props extends PropsFromRedux {}

const Banner: FC<Props> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const text = <p> ✨ Bookmark classes and more by clicking <b>Login</b> ✨</p>;

  function redirect(site: string) {
    history.push("/redirect?site=" + site)
  }

  return props.banner ? (
    <div className="banner">
      <div className="content">
        {text}
        {/*<Button size="sm"></Button>*/}
      </div>
      <img src={close} alt="close" onClick={props.closeBanner} />
    </div>
  ) : null;
}

const mapState = (state: ReduxState) => ({
  banner: state.common.banner
})

const mapDispatch = {
  closeBanner
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Banner)

