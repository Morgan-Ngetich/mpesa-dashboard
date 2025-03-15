# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Environment Variables
ENV PYTHONUNBUFFERED=1 \
    PATH="/usr/local/bin:$PATH"

# Install required system dependencies
RUN apt-get update && apt-get install -y libwebp-dev && rm -rf /var/lib/apt/lists/*

# Install Poetry globally
RUN pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false

# Copy dependency files first (Leverage Docker caching)
COPY pyproject.toml poetry.lock* /app/

# Create a non-root user for OpenShift and set permissions
RUN useradd -m -d /home/nonroot -u 1001 nonroot && \
    chown -R nonroot:nonroot /app /home/nonroot

# Copy the entrypoint script BEFORE switching users
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh  # ✅ Ensure correct permissions as root

# Switch to non-root user
USER nonroot

# Install dependencies (Main or Dev based on the argument)
ARG INSTALL_DEV=false
RUN if [ "$INSTALL_DEV" = "true" ]; then poetry install --no-root ; else poetry install --no-root --only main ; fi

# Explicitly install Uvicorn in case it's missing
RUN pip install uvicorn

# Verify Poetry installation
RUN poetry check

# Set Python path
ENV PYTHONPATH=/app

# Copy the rest of the application files
COPY --chown=nonroot:nonroot . .

# Expose the application port
EXPOSE 8000

# Use the script as the entrypoint
ENTRYPOINT ["/entrypoint.sh"]