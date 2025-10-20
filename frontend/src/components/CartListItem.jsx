export default function CartListItem({ imgPath, name, quantity, ...rest }) {
  return (
    <article {...rest}>
      <div className="aspect-16/9 max-w-28 w-full">
        <img
          loading="lazy"
          className="object-cover object-center w-full h-full"
          src={`http://localhost:8000/public` + imgPath}
          alt={name}
        />
      </div>
    </article>
  );
}
