import React, {useId} from "react"
// import Select from 'react-select'
import Select from "react-select"

type Option = {
    label: string,
    value: string
}

type SelectNavProps = {
    onChange: (value: string) => void
    options: Option[],
    value?: string,
    defaultLabel: string,
    redOnActive?: boolean
}

const SelectNav: React.FC<SelectNavProps> = ({onChange, options, value, defaultLabel}) => {
    const instanceId = useId()
    const defaultValue = value ? options.filter(option => (value == option.value))[0] : {value: defaultLabel, label: defaultLabel}
    const emptyOption = {value: defaultLabel, label: defaultLabel}
    return (
        <>
            <Select instanceId={instanceId} value={defaultValue} defaultValue={emptyOption} options={[emptyOption, ...options]} isSearchable={false} onChange={
                (option) => {
                    if(option?.value == defaultLabel) {
                        onChange('')
                    } else {
                        onChange(option?.value ? option.value : '')
                    }
                }
            }
            styles={{
                control: (style, state) => {
                    return {...style, borderRadius: '0', border: 0, borderBottom: state.getValue()[0].value == defaultLabel ? '1px solid #000' : '1px solid transparent'}
                },
                menu: style => {
                    return {...style, borderRadius: 0}
                },
                option: (style, {isSelected}) => {
                    if(isSelected) {
                        return {...style, backgroundColor: 'var(--color-front-red)', color: '#fff'}
                    }
                    return style
                }
            }}
            classNames={{
                control: (state) => {
                    if(state.getValue()[0].value == defaultLabel) {
                        return 'bg-white'
                    }
                    return '!bg-front-red !text-white'
                },
                singleValue: state => {
                    if(state.getValue()[0].value == defaultLabel) {
                        return 'text-black uppercase text-front-body-big'
                    }
                    return '!text-white uppercase text-front-body-big'
                },
                indicatorSeparator: () => 'hidden',
                dropdownIndicator: (state) => {
                    if (state.getValue()[0].value == defaultLabel) return '!text-front-black-grey'
                    return '!text-white'
                },
                option: () => {
                    return 'hover:!bg-front-red hover:!text-white active:!bg-front-red active:!text-white'
                }
            }}
            />
        </>
    )
}

export default SelectNav