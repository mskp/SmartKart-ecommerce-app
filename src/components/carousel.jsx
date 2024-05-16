import { Carousel } from "@material-tailwind/react";

const carouselImages = [
  "/d117a62eb5fbb8e1.webp",
  "/f6202f13b6f89b03.webp",
  "/ae9966569097a8b7.webp",
  "/57267a180af306fe.webp",
];

export default function CarouselCustomNavigation() {
  return (
    <Carousel loop autoplay className="rounded-xl lg:h-60 h-32">
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
