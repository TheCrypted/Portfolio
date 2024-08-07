
export const getDisplacement = (base, ind, window) => {
    return (base + ind * window.innerWidth/12) % window/innerWidth;
}