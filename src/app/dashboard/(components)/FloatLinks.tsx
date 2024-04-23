import { Link } from "@/app/lib/definitions";
import { IconOptions } from "@/app/lib/utils";
import { useLinksContext } from "../(context)/LinksContext";


function FloatLink({ link }: { link: Link }) {
    const Icon = IconOptions.find((option) => option.value === link.platform)?.icon;
    const label = IconOptions.find((option) => option.value === link.platform)?.label || "Github";
    
    let bgColor;
    switch (link.platform) { 
        case 'github':
        case 'stackoverflow':
        case 'twitter':
        case 'codepen':
        case 'codewars':
            bgColor = 'bg-black';
            break;
        case 'youtube':
            bgColor = 'bg-red';
            break;
        case 'linkedin':
            bgColor = 'bg-linkedin'
            break;
        case 'facebook':
            bgColor = 'bg-blue';
            break;
        case 'twitch':
            bgColor = 'bg-twitch';
            break;
        case 'gitlab':
            bgColor = 'bg-gitlab';
            break;
        case 'freecodecamp':
            bgColor = 'bg-freecodecamp';
            break;
        case 'frontendmentor':
            bgColor = 'bg-frontendmentor';
            break;
    }
    return (
        <div className={`float-link ${bgColor}`}>
            <Icon/>
            <label >{label}</label>
        </div>
    )
}

export default function FloatLinks() {
    const { userlinks } = useLinksContext();

    return (
        <div className='float-links-container'>
            {
                userlinks.map((link, index) => (
                    <FloatLink key={index} link={link} />
                ))
            }
        </div>
    )
}