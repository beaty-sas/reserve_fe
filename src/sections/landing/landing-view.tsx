'use client';

import Box from '@mui/material/Box';
import {alpha} from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from "src/components/image";
import {Button, Grid, Stack, useTheme} from "@mui/material";
import {useRouter} from "src/routes/hooks";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {MERCHANT_SITE_URL} from "src/config-global";
import React from "react";
import Iconify from "src/components/iconify";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {SeoIllustration} from "../../assets/illustrations";

export default function LandingView() {
	const router = useRouter();
	const theme = useTheme();

	return (
		<Container maxWidth={'xl'} sx={{pb: 10}}>
			<Stack direction="row" spacing={2}>

				<Stack flex={1}>
					<Image src={'/assets/color-logo.svg'} alt={'logo'} sx={{width: 172, height: 172}}/>
					<Typography variant="h2">Вся магія онлайн записів у ваших руках</Typography>
					<Typography variant="body1" sx={{mt: 3, color: 'text.secondary'}}>
						Забудьте про ручний запис і паперові блокноти. Наш сервіс спрощує організацію роботи та підвищує
						ефективність
						вашого бізнесу.
					</Typography>
					<Stack spacing={2} sx={{mt: 3}}>
						<Button
							size="large"
							color="primary"
							sx={{maxWidth: 264}}
							fullWidth
							variant='contained'
							onClick={() => router.push(MERCHANT_SITE_URL)}
							endIcon={<ArrowOutwardIcon/>}
						>
							Спробувати бекоштовно
						</Button>
					</Stack>
				</Stack>

				<Stack flex={1} alignItems={'end'}>
					<Image src={'/assets/landing-card.png'} alt={'logo'}/>
				</Stack>

			</Stack>

			<Grid
				sx={{
					mt: 5,
					width: 1,
					borderRadius: 2,
					padding: {xs: 2, md: 10},
					display: 'grid',
					bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
				}}
			>
				<Grid>
					<Typography variant="h3" align={'center'} mb={10}>
						Інтуїтивно зрозумілий та ефективний інструмент для вашого бізнесу
					</Typography>

					<Grid container rowSpacing={9} columnSpacing={9} spacing={9}>
						<Grid item xs={6} display={'flex'}>
							<Iconify
								width={40}
								height={40}
								icon={'solar:like-bold'}
								sx={{mr: 1}}
								color={theme.palette.primary.main}
							/>
							<Box>
								<Typography variant="h6" sx={{color: 'text.primary'}}>
									Зручність
								</Typography>
								<Typography variant={'body1'} sx={{color: 'text.secondary'}}>
									Клієнти можуть записатися на послуги 24/7 з будь-якого
									пристрою
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={6} display={'flex'}>
							<Iconify
								icon={'solar:clock-circle-outline'}
								sx={{mr: 1, width: 40, height: 40}}
								color={theme.palette.primary.main}
							/>
							<Box>
								<Typography variant="h6" sx={{color: 'text.primary'}}>
									Економія часу
								</Typography>
								<Typography variant={'body1'} sx={{color: 'text.secondary'}}>
									Більше не потрібно отримувати сотні дзвінків та вручну створювати
									записи
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={6} display={'flex'}>
							<Iconify
								icon={'solar:notes-bold'}
								sx={{mr: 1, width: 40, height: 40}}
								color={theme.palette.primary.main}
							/>
							<Box>
								<Typography variant="h6" sx={{color: 'text.primary'}}>
									Гнучкість
								</Typography>
								<Typography variant={'body1'} sx={{color: 'text.secondary'}}>
									Налаштовуйте ваш робочий графік та перелік послуг
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={6} display={'flex'}>
							<DoneAllIcon sx={{mr: 1, width: 40, height: 40, color: theme.palette.primary.main}}/>
							<Box>
								<Typography variant="h6" sx={{color: 'text.primary'}}>
									Підтвердження запису
								</Typography>
								<Typography variant={'body1'} sx={{color: 'text.secondary'}}>
									Автоматичні нагадування про записи
								</Typography>
							</Box>
						</Grid>

					</Grid>

				</Grid>
			</Grid>


			<Typography variant="h3" align={'center'} mb={10} mt={10}>
				Як це працює?
			</Typography>

			<Stack direction={'row'} justifyContent={'space-around'} pb={10} flexWrap={'wrap'} spacing={5}>

				<Stack flex={1}>
					<Box
						sx={{
							height: 172,
							width: 172,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
							pt: 6,
							mb: 5,
							bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
						}}
					>
						<Typography color={theme.palette.primary.main} variant={'h1'} textAlign={'center'}>1</Typography>
					</Box>

					<Typography variant={'h6'} color={theme.palette.text.primary}>Створення кабінету</Typography>
					<Typography variant={'body1'} color={theme.palette.text.secondary}>
						Зареєструйтесь на платформі Rex, заповніть інформацію про ваш бізнес, та налаштуйте розклад послуг.
					</Typography>
				</Stack>

				<Stack flex={1}>
					<Box sx={{
						height: 172,
						width: 172,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						pt: 6,
						mb: 5,
						bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
					}}
					>
						<Typography color={theme.palette.primary.main} variant={'h1'} textAlign={'center'}>2</Typography>
					</Box>

					<Typography variant={'h6'} color={theme.palette.text.primary}>Додавання послуг</Typography>
					<Typography variant={'body1'} color={theme.palette.text.secondary}>
						Вкажіть послуги, які ви пропонуєте, їх тривалість, вартість та доступні години для запису.
					</Typography>
				</Stack>

				<Stack flex={1}>
					<Box sx={{
						height: 172,
						width: 172,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						pt: 6,
						mb: 5,
						bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
					}}
					>
						<Typography color={theme.palette.primary.main} variant={'h1'} textAlign={'center'}>3</Typography>
					</Box>

					<Typography variant={'h6'} color={theme.palette.text.primary}>Запуск онлайн-запису</Typography>
					<Typography variant={'body1'} color={theme.palette.text.secondary}>
						Поділіться посиланням на ваш онлайн-кабінет з клієнтами, які зможуть обрати зручний час для запису в кілька
						кліків.
					</Typography>
				</Stack>

			</Stack>

			<Stack
				direction={'row'}
				sx={{
					mt: 10,
					borderRadius: 2,
					padding: {xs: 2, md: 10},
					bgcolor: (theme) => alpha(theme.palette.grey[800], 1),
				}}
			>

				<Stack flex={1}>
					<SeoIllustration sx={{maxHeight: 360, maxWidth: 360}}/>
				</Stack>

				<Stack flex={1}>
					<Typography variant={'h2'} color={theme.palette.common.white}>
						Відчуйте переваги Rex вже сьогодні
					</Typography>
					<Button
						size="large"
						color="primary"
						fullWidth
						sx={{mt: 5}}
						variant='outlined'
						onClick={() => router.push(MERCHANT_SITE_URL)}
						endIcon={<ArrowOutwardIcon/>}
					>
						Спробувати бекоштовно
					</Button>
				</Stack>

			</Stack>

		</Container>
	);
}
