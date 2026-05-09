import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type Props = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: Props) => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);

	const formRef = useRef<HTMLElement>(null);
	useEffect(() => {
		if (!isParamsFormOpen) {
			return;
		}
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsParamsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isParamsFormOpen]);

	const toggleMenu = () => {
		setIsParamsFormOpen(!isParamsFormOpen);
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const createHandleChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setFormState({ ...formState, [key]: option });
		};

	return (
		<>
			<ArrowButton isOpen={isParamsFormOpen} onClick={toggleMenu} />

			<aside
				ref={formRef}
				className={clsx(
					styles.container,
					isParamsFormOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={createHandleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={createHandleChange('fontSizeOption')}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={createHandleChange('fontColor')}
					/>
					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={createHandleChange('backgroundColor')}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={createHandleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
