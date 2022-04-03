import React, { useState } from "react";
import { Product, Images, Variant } from "../../types/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./style.scss";
interface Props {
  currentItems: Product[];
}

const ImagesList = ({ images }: { images: Images[] }) => {
  return (
    <div className="variant__images">
      {images.map((image) => (
        <LazyLoadImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="list-item__image"
          effect="blur"
        />
      ))}
    </div>
  );
};

const VariantList = ({ variants }: { variants: Variant[] }) => {
  return (
    <div className="variant">
      {variants.map((variant) => (
        <div className="variant__detail">
          <div>
            <strong>Variant:</strong> {variant.title}
          </div>
          <div>
            <strong>Weight:</strong> {variant.weight} {variant.weight_unit}
          </div>
          <div>
            <strong>Price:</strong> {variant.price}
            <small>$</small>
          </div>
        </div>
      ))}
    </div>
  );
};

const ListItem = ({ product }: { product: Product }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      key={product.id}
      className="list-item"
      onClick={() => setIsActive(!isActive)}
    >
      <div className="list-item__title">
        {product.title}
        <div>{isActive ? <HiChevronDown /> : <HiChevronUp />}</div>
      </div>
      <div className="list-item__price">
        {product.variants[0].price}
        <small>$</small>
      </div>
      {isActive && (
        <div className="list-item__detail">
          <div>
            <strong>Vendor:</strong> {product.vendor}
          </div>
          <ImagesList images={product.images} />
          <VariantList variants={product.variants} />
        </div>
      )}
    </div>
  );
};

const List = ({ currentItems }: Props) => {
  return (
    <div className="list-container">
      {currentItems && currentItems.length ? (
        currentItems.map((product) => (
          <ListItem key={product.id} product={product} />
        ))
      ) : (
        <div className="no-result">No result. Please try something else.</div>
      )}
    </div>
  );
};

export default List;
