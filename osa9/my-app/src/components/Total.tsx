interface TotalProps {
    parts: 
        {
            name: string,
            exerciseCount: number,
        }[]
}

const Total = (props: TotalProps) => {
    const courseParts = props.parts;
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    );
}

export default Total;