import { CoursePart } from "../types";

interface ContentProps {
    parts: CoursePart[]
}

const Content = (props: ContentProps) => {
    const courseParts = props.parts;
    
    return (
        <ul style={{ listStyle: 'none', padding: 0}}>
            {courseParts.map(part => <Part part={part} key={courseParts.indexOf(part)}/>)}
        </ul>
    );
}

interface PartProps {
    part: CoursePart
}

const Part = (props: PartProps) => {
    const coursePart = props.part;
    const listStyle = {
        paddingBottom: 10
    };

    switch (coursePart.kind) {
        case "basic":
            return (
                <li style={listStyle}>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i>
                </li>
            );
        case "background":
            return (
                <li style={listStyle}>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i><br/>
                    required skills: {coursePart.backgroundMaterial}
                </li>
            );
        case "group":
            return (
                <li style={listStyle}>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    project excercises {coursePart.groupProjectCount}
                </li>
            );
    }
}

export default Content;