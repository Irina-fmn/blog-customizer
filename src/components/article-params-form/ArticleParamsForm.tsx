import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: Props) => {
	const [isOpen, setIsOpen] = useState(true);
	const [formState, setFormState] = useState(articleState);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleMenu} />

			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(option) => {
							setFormState({ ...formState, fontFamilyOption: option });
						}}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={(option) => {
							setFormState({ ...formState, fontSizeOption: option });
						}}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(option) => {
							setFormState({ ...formState, fontColor: option });
						}}
					/>
					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(option) => {
							setFormState({ ...formState, backgroundColor: option });
						}}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контена'
						onChange={(option) => {
							setFormState({ ...formState, contentWidth: option });
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
