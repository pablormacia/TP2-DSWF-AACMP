import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const asset = (value) => value?.replace(/(^|,\s*)img\//g, "$1/img/");
export default function ThemedImage({
  real = false,
  realSrc,
  realAlt,
  ...props
}) {
  const { theme } = useOutletContext();
  useEffect(() => {
    if (realSrc) {
      const image = new Image();
      image.src = realSrc;
    }
  }, [realSrc]);
  const suffix = theme === "dark" ? "dark" : "light";
  return (
    <img
      {...props}
      src={real ? realSrc : asset(props[`data-src-${suffix}`] || props.src)}
      srcSet={
        real ? undefined : asset(props[`data-srcset-${suffix}`] || props.srcSet)
      }
      alt={real ? realAlt : props.alt}
    />
  );
}
