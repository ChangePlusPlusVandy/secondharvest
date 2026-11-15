import "server-only";

import { demoLibraryRepository } from "./demo-repository";
import type { LibraryRepository } from "./types";

// This is the only adapter selection point. Replace it after authentication,
// database permissions, and private storage have been implemented and verified.
// No environment variable silently switches this scaffold to production data.
export const libraryRepository: LibraryRepository = demoLibraryRepository;
