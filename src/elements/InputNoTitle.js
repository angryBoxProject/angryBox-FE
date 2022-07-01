import React from 'react';
import tw from 'tailwind-styled-components';

const InputStyles = tw.input`
w-full px-4 border-0 border-b-2 border-[#DA463C] rounded-t-lg py-1
hover:border-[#DA463C] border-box peer
active:border-[#DA463C] text-neutral-400
focus:border-[#DA463C] font-min1 bg-[#484848] border-b-[#DA463C]
outline-0
${props => (props.is_error ? `ring-1 ring-dred-400` : '')};
${props => (props.cardsize === '1' ? `h-I01 px-4` : '')};
${props => (props.cardsize === '2' ? `h-44 px-4` : '')};
`;

const TextareaStyles = tw.textarea`
w-full px-4 border border-dgray-400 rounded-t-lg py-1
hover:border-dpurple-200 border-box peer
active:border-dpurple-300 text-neutral-400
focus:border-dpurple-300 font-min1 p-2
outline-none
${props => (props.is_error ? `ring-1 ring-dred-400` : '')};
${props => (props.cardsize === '1' ? `h-I01 px-4` : '')};
${props => (props.cardsize === '2' ? `h-44 px-4` : '')};
`;

const Sp = tw.h2`
flex justify-end text-xs font-min1
peer-invalid:visible
`;

const InputNoTitle = props => {
    const {
        label,
        type,
        placeholder,
        value,
        onChange,
        onSubmit,
        onBlur,
        is_submit,
        is_error,
        textarea,
        cardsize,
        is_value,
        maxlen,
        className,
        name,
        onKeyDown,
    } = props;
    if (is_submit) {
        return (
            <>
                <div className="w-full">
                    <label id={label}>
                        <InputStyles
                            type={type}
                            value={value}
                            is_error={is_error}
                            cardsize={cardsize}
                            placeholder={placeholder}
                            onChange={onChange}
                            maxlen={maxlen}
                            onKeyDown={onKeyDown}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    onSubmit(e);
                                }
                            }}
                        />
                        {is_error && <Sp>글자수를 초과하였습니다.</Sp>}
                        <Sp>
                            {is_value}/{maxlen}
                        </Sp>
                    </label>
                </div>
            </>
        );
    }

    if (textarea) {
        return (
            <>
                <div className="col-start-3 col-end-8 row-start-1 mb-8">
                    <label id={label}>
                        <TextareaStyles
                            textarea
                            type={type}
                            value={value}
                            name={name}
                            is_error={is_error}
                            cardsize={cardsize}
                            placeholder={placeholder}
                            onChange={onChange}
                            onBlur={onBlur}
                            maxlen={maxlen}
                            onKeyDown={onKeyDown}
                            className={className}
                        />
                        {is_error && <Sp>글자수를 초과하였습니다.</Sp>}
                        {maxlen && (
                            <Sp>
                                {is_value}/{maxlen}
                            </Sp>
                        )}
                    </label>
                </div>
            </>
        );
    } else
        return (
            <>
                <div className="col-start-3 col-end-8 row-start-1 mb-8">
                    <label id={label}>
                        <InputStyles
                            type={type}
                            value={value}
                            name={name}
                            is_error={is_error}
                            cardsize={cardsize}
                            placeholder={placeholder}
                            onChange={onChange}
                            onBlur={onBlur}
                            maxlen={maxlen}
                            className={className}
                            onKeyDown={onKeyDown}
                        />
                        {is_error && <Sp>글자수를 초과하였습니다.</Sp>}
                        {maxlen && (
                            <Sp>
                                {is_value}/{maxlen}
                            </Sp>
                        )}
                    </label>
                </div>
            </>
        );
};

InputNoTitle.defaultProps = {
    label: '',
    type: 'text',
    placeholder: '입력해주세요!',
    value: '',
    cardsize: '1',
    onChange: () => {},
    onSubmit: () => {},
    onKeyDown: () => {},
    is_submit: false,
    is_value: 0,
    className: '',
};

export default InputNoTitle;
