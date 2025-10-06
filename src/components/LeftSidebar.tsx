import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border pt-8 pb-16 flex flex-col items-center z-40">
      <Link to="/" className="mb-32">
        <div className="border border-foreground p-4 text-center">
          <div className="text-xl font-light tracking-[0.2em]">AN</div>
          <div className="text-xl font-light tracking-[0.2em]">DO</div>
          <div className="w-full h-[1px] bg-foreground my-1" />
          <div className="text-xs tracking-[0.3em]">JV</div>
        </div>
      </Link>

      <div className="flex-1 flex items-center">
        <p 
          className="text-xs tracking-[0.3em] uppercase"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          Feel the moment
        </p>
      </div>

      <div className="text-[8px] text-center leading-relaxed text-muted-foreground">
        © 2025 ANDO JV. Все права<br />
        защищены. Не является публичной<br />
        офертой.
      </div>
    </aside>
  );
};

export default LeftSidebar;
