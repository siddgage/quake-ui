import { Link } from "react-router-dom"

export const DefaultErrorPage = () => {
    return (
        <div className="">Hi from default error page
            <Link to={'/'}>HomePage</Link>
        </div>

    )
}