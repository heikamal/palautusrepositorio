interface ContentProps {
    parts: 
        {
            name: string,
            exerciseCount: number,
        }[]
    
}

const Content = (props: ContentProps) => {
    const courseParts = props.parts;
    
    return (
        <ul style={{ listStyle: 'none', padding: 0}}>
            {courseParts.map(part => <li key={courseParts.indexOf(part)}>{part.name} {part.exerciseCount}</li>)}
        </ul>
    );
}

export default Content;