import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Course, CourseRow } from 'src/shared/types/Course';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { CourseScraper } from '../lib/courseCatalog/CourseScraper';
import { populateSearchInputs } from '../lib/courseCatalog/populateSearchInputs';
import { SiteSupport } from '../lib/getSiteSupport';
import TableHead from './injected/TableHead';
import TableRow from './injected/TableRow';

interface Props {
    support: SiteSupport.COURSE_CATALOG_DETAILS | SiteSupport.COURSE_CATALOG_LIST;
}

/**
 * This is the top level react component orchestrating the course catalog page.
 */
export default function CourseCatalogMain({ support }: Props) {
    const [rows, setRows] = React.useState<CourseRow[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const isScrolling = useInfiniteScroll(async () => {
        console.log('infinite scroll');
        return true;
    });

    useEffect(() => {
        populateSearchInputs();
    }, []);

    useEffect(() => {
        const scraper = new CourseScraper(support);
        const rows = scraper.scrape(document.querySelectorAll<HTMLTableRowElement>('table tbody tr'));
        console.log('useEffect -> rows:', rows);
        setRows(rows);
    }, []);

    const handleRowButtonClick = (course: Course) => {
        setSelectedCourse(course);
    };

    return (
        <div>
            <TableHead>Plus</TableHead>
            {rows.map(row => (
                <TableRow
                    element={row.rowElement}
                    course={row.course}
                    support={support}
                    onClick={handleRowButtonClick}
                />
            ))}
            {isScrolling && <div>Scrolling...</div>}
        </div>
    );
}