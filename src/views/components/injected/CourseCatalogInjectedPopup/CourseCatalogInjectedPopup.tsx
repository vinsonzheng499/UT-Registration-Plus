import type { Course } from '@shared/types/Course';
import type { DialogProps } from '@views/components/common/Dialog/Dialog';
import Dialog from '@views/components/common/Dialog/Dialog';
import useSchedules from '@views/hooks/useSchedules';
import React from 'react';

import Description from './Description';
import GradeDistribution from './GradeDistribution';
import HeadingAndActions from './HeadingAndActions';

export type CourseCatalogInjectedPopupProps = DialogProps & {
    course: Course;
};

/**
 * CourseCatalogInjectedPopup component displays a popup with course details.
 *
 * @component
 * @param {CourseCatalogInjectedPopupProps} props - The component props.
 * @param {Course} props.course - The course object containing course details.
 * @param {Schedule} props.activeSchedule - The active schedule object.
 * @param {Function} props.onClose - The function to close the popup.
 * @returns {JSX.Element} The CourseCatalogInjectedPopup component.
 */
function CourseCatalogInjectedPopup({ course, ...rest }: CourseCatalogInjectedPopupProps): JSX.Element {
    const emptyRef = React.useRef<HTMLDivElement>(null);
    const [activeSchedule] = useSchedules();

    return (
        <Dialog className='max-w-[780px] px-6' {...rest} initialFocus={emptyRef}>
            <div className='hidden' ref={emptyRef} />
            <HeadingAndActions course={course} onClose={rest.onClose as () => void} activeSchedule={activeSchedule} />
            <Description course={course} />
            <GradeDistribution course={course} />
        </Dialog>
    );
}

export default React.memo(CourseCatalogInjectedPopup);
