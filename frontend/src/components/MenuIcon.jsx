export default function Hamburger({ isOpen }) {
  return (
    <div className="relative h-6 w-6">
      <span
        data-open={isOpen}
        className="bg-dark-200 transition-all delay-75 duration-300 ease-in-out  data-[open=true]:rotate-[-45deg] data-[open=true]:top-3 block rounded-lg  absolute top-1 w-full h-[2px]"
      ></span>
      <span
        data-open={isOpen}
        className="bg-dark-200 transition-all duration-200 ease-in-out block data-[open=true]:opacity-0 rounded-lg  absolute top-3 w-full h-[2px]"
      ></span>
      <span
        data-open={isOpen}
        className="bg-dark-200 transition-all delay-75 duration-300 ease-in-out data-[open=true]:rotate-45 data-[open=true]:top-3 block rounded-lg absolute top-5 w-full h-[2px]"
      ></span>
    </div>
  );
}
