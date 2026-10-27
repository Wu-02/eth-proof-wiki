# Third-party notices

This project installs the following open-source dependencies through the exact versions and integrity hashes recorded in `package-lock.json`:

- **KaTeX 0.19.1**, MIT. The rendered site includes its CSS and font assets. License: <https://github.com/KaTeX/KaTeX/blob/v0.19.1/LICENSE>.
- **markdown-it 15.0.3**, MIT. Used at build time. License: <https://github.com/markdown-it/markdown-it/blob/15.0.3/LICENSE>.
- **yaml 2.9.1**, ISC. Used at build time. License: <https://github.com/eemeli/yaml/blob/v2.9.1/LICENSE>.

Transitive dependency licenses remain included in each installed package. The KaTeX license is copied into the static output at `assets/katex/LICENSE` with the distributed assets.

The paper and the user's supplied dependency diagram retain their respective rights. Their inclusion or citation is not a license grant for unrelated use.

## OpenAI mathematics source and adaptations

Original work: **OpenAI, *The Exponential Time Hypothesis is False***, October 25, 2026.

Official source: <https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026>.

The source repository is distributed under **Apache License 2.0**. Its complete license is reproduced unchanged in `licenses/OpenAI-math-Apache-2.0.txt`. Original attribution and any applicable notices remain with the source work.

This project adds Chinese-language proof-navigation summaries and, in a subsequent stage, Chinese translations of the retained proof content. These are adaptations, not the original English text. The original 33-node, 43-arrow dependency graph supplied by the user is preserved only as a source archive in `reference/original-dependency.svg`. An earlier site adaptation corrected C.1's reversed “upper bound” label to “superlinear circuit lower bound”. At the user's request, the current site graph omits five downstream corollaries and their incident arrows, retaining 28 proof nodes and 38 source arrows; it rearranges their layout and links nodes to local Wiki pages. Source arrows remain distinguished from dependency metadata in the Markdown notes. The corresponding corollary pages and translated application sections are excluded from the current online scope. No additional license is asserted for the user's diagram.
