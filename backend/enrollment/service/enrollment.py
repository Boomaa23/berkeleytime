"""Enrollment Service."""
from catalog.resource import sis_class_resource
from catalog.mapper import section_mapper
from enrollment.mapper import enrollment_mapper
from enrollment.models import Enrollment


class EnrollmentService:
    """Application logic for enrollment information."""

    def get_live_enrollment(
            self, semester, year, course_id,
            abbreviation, course_number, ccn=None, log=False):
        response = sis_class_resource.get(
            semester=semester,
            year=year,
            course_id=course_id,
            abbreviation=abbreviation,
            course_number=course_number,
            log=True,
        )
        extras = {
            'course_id': int(course_id),
            'abbreviation': abbreviation,
            'course_number': course_number,
            'semester': semester,
            'year': year,
        }
        enrollments = []
        for sect in response:
            section = section_mapper.map(sect, extras=extras)
            enrollment = enrollment_mapper.map(sect)
            if ccn:
                if ccn == section['ccn']:
                    enrollments.append(enrollment)
                    break
            else:
                if section['is_primary'] and not section['disabled']:
                    enrollments.append(enrollment)

        return enrollments


    def update_or_create_from_dict(self, enroll_dict):
        return Enrollment.objects.update_or_create(
            section_id=enroll_dict['section_id'],
            date_created=enroll_dict['date_created'],
            defaults=enroll_dict,
        )


enrollment_service = EnrollmentService()
