export default function Work() {
    const works = [
        {
            title: "Project One",
            description: "Short description of the project one",
        },
        {
            title: "Project Two",
            description: "Short description of the project two",
        },
        {
            title: "Project Three",
            description: "Short description of the project three",
        },
        {
            title: "Project Four",
            description: "Short description of the project four",
        },
    ];

    return (
        <section id="works" className="bg-[#0D0D0C] text-white">
            <div className="mx-auto w-full max-w-[1400px] px-6 py-24">
                <div className="flex flex-col justify-between gap-2">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Selected works
                    </h2>
                    <p className="text-white/60 max-w-lg">
                        A few projects I’m proud of — visual identity, web, and 3D explorations
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {works.map((w, i) => (
                        <article
                        key={i}
                        className="group rounded-[20px] border border-white/10 bg-white/[0.03] px-4 pt-4 pb-8 transition hover:border-white/20">
                            <div className="aspect-[16/9] w-full rounded-[4px] bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10" />

                            <h3 className="mt-4 text-lg font-medium">{w.title}</h3>
                            <p className="mt-2 text-sm text-white/60">{w.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}