import { ContributionLevel } from './contribution-level'

export const ACTIVITY_LEVEL_STYLE: Readonly<Record<ContributionLevel, string>> =
	{
		[ContributionLevel.None]: 'bg-indigo-600/5 dark:bg-indigo-600/8',
		[ContributionLevel.Low]: 'bg-violet-300/70 dark:bg-violet-800/70',
		[ContributionLevel.Medium]: 'bg-violet-400/80 dark:bg-violet-600/80',
		[ContributionLevel.High]: 'bg-violet-500 dark:bg-violet-500',
		[ContributionLevel.VeryHigh]: 'bg-violet-600 dark:bg-violet-400'
	}
