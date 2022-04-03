import { Product } from "../../types/api";
import "./style.scss";
interface Props {
  currentItems: Product[];
}

const List = ({ currentItems }: Props) => {
  return (
    <div className="item-container">
      {currentItems && currentItems.length ? (
        currentItems.map((product) => (
          <div key={product.id} className="list-item">
            {product.title}
            {product.variants.map((variant) => (
              <div key={variant.title}>
                {variant.title} {variant.price}
              </div>
            ))}
            {product.images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={product.title}
                className="list-item__image"
              />
            ))}
          </div>
        ))
      ) : (
        <div className="no-result">No result. Please try something else.</div>
      )}
    </div>
  );
};

export default List;
