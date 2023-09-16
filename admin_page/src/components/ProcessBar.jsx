function ProcessBar({ width }) {
    return (
        <div style={{ '--width': `${width}%` }} className='process-bar'></div>
    );
}

export default ProcessBar;
