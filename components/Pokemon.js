import { useState} from "react";
import Image from 'next/image'
import styles from '../styles/Pokemon.module.css';
import { useRouter } from "next/router";

function Pokemon(props) {
  const router = useRouter();
  return (
    <div id={props.id} className={`${styles.pokemon} ${styles[props.typeName]}`} onClick={() => router.push(`/pokemon/${props.id}`)}>
        <div className={styles.imgContainer}>
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} width={100} height={100} alt='pokemon' />
        </div>
        <div className={styles.info}>
            <h3 className={styles.name}>{props.name}</h3>
            <span className={styles.type}>Type : <span>{props.typeName}</span></span>
        </div>
    </div>
  );
}

export default Pokemon;