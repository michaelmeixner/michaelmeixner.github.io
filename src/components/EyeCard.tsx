import { Eye } from "./Eye";

function Eyes() {
  return (
    <div className="relative shrink-0" data-name="eyes">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative">
        <Eye isRightEye={false} />
        <Eye isRightEye={true} />
      </div>
    </div>
  );
}

function Couch() {
  return (
    <div
      className="bg-[var(--cookie-monster-blue)] flex items-end shrink-0 h-[143px] w-[800px] overflow-visible rounded-t-3xl rounded-bl-md rounded-br-md border-b-[5px] relative"
      data-name="couch"
    >
      {/* Left armrest */}
      <div
        className="bg-[var(--cookie-monster-blue)] relative shrink-0 h-[150px] w-[120px] border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-3xl rounded-bl-md z-10"
        data-name="left-armrest"
      ></div>

      {/* Middle section with back and seat cushions */}
      <div className="flex-1 relative h-[160px]">
        {/* Back cushions container */}
        <div className="flex absolute inset-x-0 top-0 h-[160px] items-end">
          {/* Left back cushion */}
          <div
            className="bg-[var(--cookie-monster-blue)] flex-1 h-full border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-2xl shadow-inner"
            data-name="cushion-back-left"
          ></div>
          {/* Right back cushion */}
          <div
            className="bg-[var(--cookie-monster-blue)] flex-1 h-full border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-2xl shadow-inner"
            data-name="cushion-back-right"
          ></div>
        </div>

        {/* Seat cushions container */}
        <div className="flex absolute inset-x-0 bottom-0 h-[60px] items-end">
          {/* Left seat cushion */}
          <div
            className="bg-[var(--cookie-monster-blue)] flex-1 h-full border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-2xl shadow-inner"
            data-name="cushion-seat-left"
          ></div>
          {/* Right seat cushion */}
          <div
            className="bg-[var(--cookie-monster-blue)] flex-1 h-full border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-2xl shadow-inner"
            data-name="cushion-seat-right"
          ></div>
        </div>
      </div>

      {/* Right armrest */}
      <div
        className="bg-[var(--cookie-monster-blue)] relative shrink-0 h-[150px] w-[120px] border-4 border-b-0 border-[rgba(0,0,0,0.2)] rounded-t-3xl rounded-br-md z-10"
        data-name="right-armrest"
      ></div>

      {/* Divider */}
      <div className="bg-[var(--metal-color)] absolute shrink-0 h-[6px] w-[784px] border-2 border-b-0 z-11 bottom-[-10px] left-1/2 -translate-x-1/2"></div>

      {/* Legs - alternating blue rectangles and metal squares */}
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex gap-0">
        <div className="bg-[var(--cookie-monster-blue)] w-[87px] h-[50px] border-2 border-l-4 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--metal-color)] w-[50px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--cookie-monster-blue)] w-[90px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--metal-color)] w-[50px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--cookie-monster-blue)] w-[90px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--metal-color)] w-[50px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--cookie-monster-blue)] w-[90px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--metal-color)] w-[50px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--cookie-monster-blue)] w-[90px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--metal-color)] w-[50px] h-[50px] border-2 border-[rgba(0,0,0,0.2)]"></div>
        <div className="bg-[var(--cookie-monster-blue)] w-[87px] h-[50px] border-2 border-r-4 border-[rgba(0,0,0,0.2)]"></div>
      </div>

      {/* Divider */}
      <div className="bg-[var(--metal-color)] absolute shrink-0 h-[6px] w-[784px] border-2 border-b-0 z-11 bottom-[-65px] left-1/2 -translate-x-1/2"></div>

      {/* Small rectangles under (bottoms of) armrests and seat cushions */}
      {/* Left armrest foot */}
      <div className="bg-[var(--cookie-monster-blue)] absolute w-[120px] h-[70px] border-4 border-[rgba(0,0,0,0.2)] bottom-[-135px] left-0 rounded-b-2xl rounded-tl-md"></div>
      {/* Left seat cushion foot */}
      <div className="bg-[var(--cookie-monster-blue)] absolute w-[280px] h-[70px] border-4 border-[rgba(0,0,0,0.2)] bottom-[-135px] left-[120px] rounded-b-2xl"></div>
      {/* Right seat cushion foot */}
      <div className="bg-[var(--cookie-monster-blue)] absolute w-[280px] h-[70px] border-4 border-[rgba(0,0,0,0.2)] bottom-[-135px] right-[120px] rounded-b-2xl"></div>
      {/* Right armrest foot */}
      <div className="bg-[var(--cookie-monster-blue)] absolute w-[120px] h-[70px] border-4 border-[rgba(0,0,0,0.2)] bottom-[-135px] right-0 rounded-b-2xl rounded-tr-md"></div>
    </div>
  );
}

function Monster() {
  return (
    <div
      className="relative shrink-0 h-full w-full overflow-visible"
      data-name="monster"
    >
      <div className="flex flex-col items-center justify-center overflow-visible relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-[22px] py-[117px] relative">
          <Eyes />
          <Couch />
        </div>
      </div>
    </div>
  );
}

export function EyeCard() {
  return (
    <div className="flex flex-col justify-center overflow-visible relative size-full">
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-[18px] relative">
        <Monster />
      </div>
    </div>
  );
}
