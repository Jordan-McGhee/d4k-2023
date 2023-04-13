import { Link } from "react-router-dom"

const CardListItem = (props) => {

    return (
        <li className="my-4">
            <p className="uppercase text-xl font-bold mb-2 border-b-2 pb-2 w-fit">{ props.question }</p>
            <p className= "text-lg">{ props.response }</p>

            {
                props.link &&
                <Link
                    className= "text-lg mt-2 italic underline underline-offset-4"
                    to = { props.link }
                    target = "_blank"
                > 
                    {props.linkText}
                </Link>
            }
        </li>
    )
}

export default CardListItem