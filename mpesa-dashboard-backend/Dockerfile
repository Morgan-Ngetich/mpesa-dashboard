# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app/

# Environment Variables
ENV PYTHONUNBUFFERED=1 \
    PATH="/root/.local/bin:$PATH"

# Install Poetry using the official method
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry && \
    poetry config virtualenvs.create false

# Install libwebp for WebP support in Pillow
RUN apt-get update && apt-get install -y libwebp-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files first to leverage Docker caching
COPY pyproject.toml poetry.lock* /app/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false

# Install dependencies (main or dev based on the argument)
RUN if [ "$INSTALL_DEV" = "true" ] ; then poetry install --no-root ; else poetry install --no-root --only main ; fi

# Verify Poetry installation
RUN poetry check

# Set Python path
ENV PYTHONPATH=/app

# Copy the rest of the application files
COPY . .

# Ensure `start.sh` has execution permissions
COPY ./start.sh /start.sh
# RUN chmod +x /start.sh 

# Set entrypoint
ENTRYPOINT ["/start.sh"]