import { useEffect, useRef } from "react";

const ComponentWrapper = ({ children, setDisplayOptions }) => {
  const containerRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setDisplayOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div ref={containerRef}>{children}</div>
    </>
  );
};

export default ComponentWrapper;
