import { inputGroups } from '~/common';
import { logger } from '~/utils/logger';
import Radio from '../Radio';
import Typography from '../Typography';

function PayMethods({ register = () => ({}) }) {
    const isLogger = false;

    if (isLogger) {
        logger({ groupName: PayMethods.name, values: [register] });
    }

    return (
        <>
            {inputGroups.payments.map((item) => (
                <Radio
                    key={item.value}
                    id={item.value}
                    name={item.name}
                    value={item.value}
                    register={register}
                >
                    <Typography variant={'text1'}>{item.text}</Typography>
                    {item.icon}
                </Radio>
            ))}
        </>
    );
}

export default PayMethods;
