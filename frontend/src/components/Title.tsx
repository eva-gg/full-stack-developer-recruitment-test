import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}>{

}

export default function Title(props: Props) {
    return <div className="h3 m-0 text-uppercase">{props.children}</div>
}