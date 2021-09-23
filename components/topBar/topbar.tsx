import { Moon, Sun } from 'react-feather'

interface TopBarProps{
    theme: number,
    setTheme: (e: number) => void,
    space: number,
    setSpace: (e: number) => void
}

export default function TopBar({theme, setTheme, space, setSpace} : TopBarProps) {
    return (
        <div className={`top-bar top-bar-${(theme)?'light':'dark'}`} key={-1}>
            <select value={space} onChange={(event) => setSpace(Number(event.target.value))}>
                <option value="0">Atlan Internship</option>
                <option value="1">Personal Work</option>
            </select>
            <button className={`theme-button-${(theme)?'light':'dark'}`} onClick={() => setTheme((theme+1)%2)}>
                Switch to {(theme)?'Dark':'Light'} {(theme)?<Moon size={17.5}/>:<Sun size={20}/>}
            </button>
        </div>
    )
}