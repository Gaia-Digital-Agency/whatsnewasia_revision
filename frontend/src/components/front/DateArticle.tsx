import { formatPublished } from "../../lib/utils/format"
type DateArticleProps = {
    date?: string
}

const DateArticle: React.FC<DateArticleProps> = ({date}) => {

    const displayDate = formatPublished(date)
    if(displayDate) {
        return (
            <div className="date-wrapper flex gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M1.125 4.14229C1.125 3.17103 1.91236 2.38367 2.88362 2.38367H12.1164C13.0877 2.38367 13.875 3.17103 13.875 4.14229V11.6164C13.875 12.5877 13.0877 13.375 12.1164 13.375H2.88362C1.91236 13.375 1.125 12.5877 1.125 11.6164V4.14229Z" stroke="var(--color-front-red)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.98267 0.624878V3.70246" stroke="var(--color-front-red)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.0173 0.624878V3.70246" stroke="var(--color-front-red)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.76294 5.90027H11.2371" stroke="var(--color-front-red)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-front-small text-front-red">{displayDate}</p>
            </div>
        )
    }
}

export default DateArticle