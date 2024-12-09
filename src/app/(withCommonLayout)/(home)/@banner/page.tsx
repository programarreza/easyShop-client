import Container from "@/src/components/ui/Container";

const Banner = () => {
  return (
    <Container>
      <div className="min-h-[90vh] border border-red-500">
        <p className="flex justify-center items-center mt-24">
          {" "}
          this is banner area
        </p>
      </div>
    </Container>
  );
};

export default Banner;
