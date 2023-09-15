/* eslint-disable @typescript-eslint/ban-ts-comment */
import { memo } from 'react';
import { CardStyled } from './styles';
import json from 'assets/flags/index.json'
import { getOnStateT } from 'types/getOnStateT';
import { countriesT } from 'types/countriesT';

interface propsI {
    name: string
    isState?: boolean
    state?: getOnStateT
    country?: countriesT
    abreviation?: string
}

function Card({name, abreviation, isState, state, country}: propsI) {
    return (
        <CardStyled>
            <span className="close"></span>
            <span className="arrow"></span>
            <article>
            <h2>{name}</h2>
            {isState || name === "Brazil" ? <div className="title" style={{color: 'white'}}>{abreviation || "BR"}</div> : <></>}
            <div className="pic">
                {
                    isState || name === "Brazil"
                    //@ts-ignore
                    ? <img src={json[name]} />
                    : <></>
                }
            </div>

            <div className="desc">
                {isState && <><span>Recusas:</span> {state?.refuses} <br /></>}
                <span>Mortes:</span> {country?.deaths || state?.deaths} <br/>
                {isState && <><span>Suspeitas:</span> {state?.suspects} <br/></>}
                {!isState && country?.recovered && <><span>Pessoas recuperadas:</span> {country?.recovered} <br/></>}
                {!isState && country?.confirmed && <><span>Casos confirmados:</span> {country?.confirmed} <br/></>}
                {country?.cases || state?.cases && <><span>Casos:</span> {country?.cases || state?.cases} <br/></>}
                {isState && <><span>Transmitindo:</span> {state?.broadcast ? 'Sim' : 'Não'}</>}
            </div>

            </article>
        </CardStyled>
    )
}

const CardMemorized = memo(Card)
export default CardMemorized