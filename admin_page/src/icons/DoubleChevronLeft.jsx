function DoubleChevronLeft({ classes }) {
    return (
        <svg
            width={14}
            height={14}
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={classes}
        >
            <path
                d='M13 1L7 7L13 13'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
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

export default DoubleChevronLeft;
