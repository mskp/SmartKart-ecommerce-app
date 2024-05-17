import { Carousel } from "@material-tailwind/react";

/**
 * Component for displaying a carousel with custom navigation.
 * @returns {JSX.Element} The JSX element for the CarouselCustomNavigation component.
 */
export default function CarouselCustomNavigation() {
  // Array of carousel images
  const carouselImages = [
    "/d117a62eb5fbb8e1.webp",
    "/f6202f13b6f89b03.webp",
    "/ae9966569097a8b7.webp",
    "/57267a180af306fe.webp",
  ];

  return (
    // Carousel component from Material Tailwind
    <Carousel loop autoplay className="rounded-xl lg:h-60 h-36">
      {/* Mapping through carousel images and rendering them */}
      {carouselImages.map((image, index) => (
        <img
          key={index}
          src={`/image/carousel/${image}`}
          alt={`${image}-${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}
