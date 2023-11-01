import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>exercises: {part.exerciseCount}</p>
        </>
      );

    case 'group':
      return (
        <>
          <h3>{part.name}</h3>
          <p>exercises: {part.exerciseCount}</p>
          <p>group projects: {part.groupProjectCount}</p>
        </>
      );

    case 'background':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
          <p>exercises: {part.exerciseCount}</p>
        </>
      );

    case 'special':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>requirements:</p>
          <ul>
            {part.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
          <p>exercises: {part.exerciseCount}</p>
        </>
      );

    default:
      return assertNever(part);
  }
};

export default Part;

