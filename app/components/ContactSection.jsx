"use client";

import React from "react";
import EmailButton from "./EmailButton";
import { FadeIn, Stagger } from "./Motion";

const socials = [
    { id: "whatsapp", name: "WhatsApp", href: "https://wa.me/79132050935", icon: WhatsAppIcon },
    { id: "tg", name: "Telegram", href: "https://t.me/itshldkv", icon: TelegramIcon },
    { id: "instagram", name: "Instagram", href: "https://instagram.com/egor.dsgn", icon: InstagramIcon },
    { id: "threads", name: "Threads", href: "https://threads.com/@egor.dsgn", icon: ThreadsIcon},
];

export default function ContactSection() {
    return (
        <section id="contact" className="section-frame relative text-text-primary">
            <div className="section-shell">
            <div className="section-content pt-16 pb-4 sm:pt-20 sm:pb-8 lg:pt-24 lg:pb-12">
                <Stagger className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                    <FadeIn className="flex flex-col gap-4 md:flex-row md:justify-between" inView={false}>
                        <FadeIn
                            as="h2"
                            className="text-2xl font-medium text-balance text-text-primary"
                            inView={false}
                        >
                            Напишите, если хотите обсудить проект
                        </FadeIn>
                        <FadeIn inView={false}>
                          <EmailButton />
                        </FadeIn>
                    </FadeIn>
                    <Stagger
                        className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
                        inView={false}
                    >
                        {socials.map((s) => {
                            const Icon = s.icon;

                            return (
                                <FadeIn
                                    as="a"
                                    key={s.id}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.name}
                                    className="group block"
                                    inView={false}
                                >
                                    <div className="flex flex-col items-center justify-center relative aspect-square w-full rounded-lg sm:rounded-2xl overflow-hidden border border-black/10 bg-bg-secondary transition-colors duration-300 ease-out group-hover:border-black/20 group-hover:bg-[#faf9f6] group-hover:text-text-primary">
                                        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
                                        <Icon className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 md:w-16 text-text-secondary transition-colors duration-300 ease-out group-hover:text-text-primary" />
                                        <span className="hidden absolute bottom-3 lg:bottom-4 left-4 right-4 text-s mlg:text-base text-center font-regular text-text-secondary transition-colors duration-300 ease-out group-hover:text-text-primary">{s.name}</span>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </Stagger>

                </Stagger>
            </div>
            </div>
            
        </section>
    );
}

function InstagramIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
    );
}

function WhatsAppIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
    );
}

function ThreadsIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
        </svg>
    );
}

function TelegramIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
        </svg>
    );
} 
