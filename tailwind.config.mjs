import { Config } from "tailwindcss";
import typographyPlugin from '@tailwindcss/typography';

const config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    // Background colors for bounty cards
    'bg-emerald-100',
    'bg-black',
    'bg-purple-200',
    'bg-yellow-100',
    'bg-blue-100',
    'bg-pink-100',
    'bg-orange-100',
    'bg-indigo-100',
    'bg-teal-100',
    // Text colors
    'text-white',
    'text-black',
    // Opacity utilities used in cards
    'opacity-70',
    'opacity-80',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					h2: {
  						marginTop: '2rem',
  						marginBottom: '1rem',
  						fontSize: '1.5rem',
  						fontWeight: '700',
  					},
  					h3: {
  						marginTop: '1.5rem',
  						marginBottom: '0.75rem',
  						fontSize: '1.25rem',
  						fontWeight: '600',
  					},
  					p: {
  						marginBottom: '1.5rem',
  						lineHeight: '1.75',
  					},
  					ul: {
  						marginBottom: '1.5rem',
  						paddingLeft: '1.5rem',
  					},
  					li: {
  						marginBottom: '0.5rem',
  					},
  					table: {
  						marginTop: '1rem',
  						marginBottom: '1rem',
  						width: '100%',
  						borderCollapse: 'collapse',
  					},
  					th: {
  						padding: '0.75rem',
  						borderBottom: '2px solid #e5e7eb',
  						fontWeight: '600',
  						textAlign: 'left',
  					},
  					td: {
  						padding: '0.75rem',
  						borderBottom: '1px solid #e5e7eb',
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [typographyPlugin]
};
export default config;