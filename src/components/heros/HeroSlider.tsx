export default function HeroSlider({
  heroImages,
  loop = true,
  autoPlay = true,
  content,
}: HeroSliderProps) {
  const [plugins, setPlugins] = useState<any[]>([]);

  // ✅ HOOK FIRST (ALWAYS)
  useEffect(() => {
    let mounted = true;

    const loadPlugin = async () => {
      if (!autoPlay) return;

      const AutoPlay = (await import("embla-carousel-autoplay")).default;

      if (mounted) {
        setPlugins([
          AutoPlay({
            delay: 5000,
          }),
        ]);
      }
    };

    loadPlugin();

    return () => {
      mounted = false;
    };
  }, [autoPlay]);

  // ✅ NOW SAFE GUARD (AFTER HOOKS)
  if (!heroImages || heroImages.length === 0) {
    return null;
  }

  return heroImages.length === 1 ? (
    <div className="bg-center bg-cover aspect-[1015/402] max-h-[650px] p-0 w-full relative">
      <ClientImage
        src={heroImages[0].bgImg}
        alt="hero"
        className="w-full h-full object-cover"
      />

      {content && (
        <div className={cn("absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-4 px-default", content.contentClass)}>
          <h1 className={cn("text-3xl font-semibold md:text-4xl lg:text-5xl text-center", content.titleClass)}>
            {content.title}
          </h1>

          {content.searchBar && <SearchBar />}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full">
      <Carousel plugins={plugins} opts={{ loop }}>
        <CarouselContent>
          {heroImages.map((hero, index) => (
            <CarouselItem
              key={index}
              className="bg-center bg-cover aspect-[1015/402] max-h-[650px] p-0 w-full"
            >
              <ClientImage
                src={hero.bgImg}
                alt={`hero-${index + 1}`}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}