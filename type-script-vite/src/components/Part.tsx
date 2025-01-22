import { CoursePart } from "../types";
interface PartProps {
    part : CoursePart
}

const Part = ({ part } : PartProps) => {
    switch (part.kind) {
        case "basic":
            return(
                <div>
                    <h3>{ part.name }</h3>
                    <p>
                        Number of exercises: { part.exerciseCount }<br/>
                        Description: { part.description }
                    </p>
                </div>
            );
        case "group":
            return(
                <div>
                    <h3>{ part.name }</h3>
                    <p>
                        
                        Number of exercises: { part.exerciseCount }<br/>
                        Number of group projects: { part.groupProjectCount }
                    </p>
                </div>
            );
        case "background":
            return(
                <div>
                    <h3>{ part.name }</h3>
                    <p>
                        Number of exercises: { part.exerciseCount }<br/>
                        Description: { part.description }<br/>
                        Background material: { part.backgroundMaterial }
                    </p>
                </div>
            );
        case "special":
            return(
                <div>
                    <h3>{ part.name }</h3>
                    <p>
                        Number of exercises: { part.exerciseCount }<br/>
                        Description: { part.description }<br/>
                        requirements: { part.requirements.map(req => <span key={req}>{req} </span>) }
                    </p>
                </div>
            )
    }
};

export default Part;