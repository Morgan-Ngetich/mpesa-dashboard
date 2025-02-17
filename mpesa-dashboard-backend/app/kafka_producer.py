from kafka import KafkaProducer
import json

KAFKA_BROKER = "kafka:9092"
TOPIC_NAME = "mpesa_statements"

def create_producer():
    return KafkaProducer(
        bootstrap_servers=KAFKA_BROKER,
        value_serializer=lambda v: json.dumps(v).encode("utf-8")
    )

def send_statement(statement_data):
    producer = create_producer()
    producer.send(TOPIC_NAME, statement_data)
    producer.flush()
    print(f"Sent statement data: {json.dumps(statement_data, indent=2)}")
