import {useEffect, useRef, useState} from "react";
import "./Market.css";

const ledgerSteps = ["Contract", "Transaction", "Verification", "Linked block"];
const ledgerNodes = [[75, 245], [210, 185], [350, 125], [485, 65]];
function useSceneActivity() {
    const ref = useRef(null);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        const element = ref.current;
        let visible = false;
        const update = () => setRunning(visible && document.visibilityState !== "hidden");
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        }, {threshold: 0.1});
        observer.observe(element);
        document.addEventListener("visibilitychange", update);
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, []);
    return [ref, running];
}

function LedgerScene() {
    const [step, setStep] = useState(0);
    const [ref, running] = useSceneActivity();
    return (
        <section ref={ref} className="market-ledger" data-running={running} aria-labelledby="penn-blockchain-heading">
            <div className="market-ledger-copy">
                <p className="market-eyebrow">Decentralized systems</p>
                <h2 id="penn-blockchain-heading">Penn<br/><em>Blockchain.</em></h2>
                <p className="market-role">Software Developer <span>Solidity / MERN</span></p>
                <p className="market-description">Developing and deploying smart contracts using Solidity for decentralized applications, with a focus on hackathons and blockchain solutions.</p>
            </div>
            <figure className="market-ledger-art">
                <svg viewBox="0 0 560 340" role="group" aria-label="Interactive linked ledger">
                    <g className="market-ledger-branches" fill="none" aria-hidden="true">
                        <path d="M75 245C35 175 85 95 155 65M210 185C195 245 260 290 325 270M350 125C335 55 270 25 215 45M485 65C535 125 525 205 465 245"/>
                        <path d="M75 245C165 300 245 305 325 270M155 65C235 10 365 5 485 65M350 125C420 150 445 200 465 245"/>
                        {[[155, 65], [325, 270], [215, 45], [465, 245]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3"/>)}
                    </g>
                    <path className="market-ledger-wire" d="M75 245L210 185L350 125L485 65" fill="none"/>
                    <path className="market-ledger-flow" d="M75 245L210 185L350 125L485 65" fill="none"/>
                    {ledgerNodes.map(([x, y], index) => (
                        <g key={ledgerSteps[index]} transform={`translate(${x} ${y})`}
                           className={index === step ? "market-node is-active" : "market-node"}
                           role="button" tabIndex={0} aria-label={ledgerSteps[index]} aria-pressed={index === step}
                           onClick={() => setStep(index)} onFocus={() => setStep(index)} onPointerEnter={() => setStep(index)}
                           onKeyDown={event => {
                               if (event.key === "Enter" || event.key === " ") {
                                   event.preventDefault();
                                   setStep(index);
                               }
                           }}>
                            <circle r="42" fill="transparent" aria-hidden="true"/>
                            <circle className="market-node-orbit" r="42" fill="none"/>
                            <path className="market-node-face" d="M0 -25L25 -12V15L0 29L-25 15V-12Z"/>
                            <path className="market-node-detail" d="M-25 -12L0 2L25 -12M0 2V29" fill="none"/>
                        </g>
                    ))}
                </svg>
            </figure>
        </section>
    );
}

export const Market = () => (
    <div className="market-scenes">
        <LedgerScene/>
    </div>
);
