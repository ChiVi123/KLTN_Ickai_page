function DoubleChevronRight({ classes }) {
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
                d='M1 13L7 7L1 1'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M7 13L13 7L7 1'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export default DoubleChevronRight;
