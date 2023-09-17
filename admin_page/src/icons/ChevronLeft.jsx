function ChevronLeft({ classes }) {
    return (
        <svg
            width={8}
            height={14}
            viewBox='0 0 8 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={classes}
        >
            <path
                d='M7 1L1 7L7 13'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export default ChevronLeft;
