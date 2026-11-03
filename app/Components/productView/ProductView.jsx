"use client";

export default function ProductView({
  product,
  onClose,
  onAddToCart,
}) {
  // if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white md:grid-cols-2"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl shadow hover:bg-gray-100"
          aria-label="Close product view"
        >
          &times;
        </button>

        {/* Product Image */}
        <div className="h-72 bg-gray-100 md:h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            {product.category}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-4 text-2xl font-semibold">
            ₹{product.price}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Add To Cart
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-800 hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}