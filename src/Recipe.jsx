import ReactMarkdown from 'react-markdown';

export default function Recipe({ recipeText }) {
  return (
    <div className="recipe">
      <h2>Your Recipe</h2>
      <ReactMarkdown>{recipeText}</ReactMarkdown>
    </div>
  );
}
