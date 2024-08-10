import { Link } from "react-router-dom"

const DefaultErrorPage = () => {
    return (
        <div className="">Hi from default error page
            <Link to={'/'}>HomePage</Link>
        </div>

    )
}

export default DefaultErrorPage