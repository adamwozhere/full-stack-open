interface Props {
  courseParts: CoursePart[];
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: Props) => {
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;

